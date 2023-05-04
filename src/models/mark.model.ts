import { MarkUtils } from "src/mark.utils";
import { MarkType } from "./mark-type.model";

export class Mark {

    // Model properties

    public parts: string[];

    public types: MarkType[];

    public shortIndex: number;

    // Static work

    /**
     * @param configurationMark : ex -> Component.ViewChildren(Selector=TemplateVariable)
     */
    public static fromConfigurationMark(configurationMark: string): Mark | null {
        const mark = new Mark();

        const splittedConfigurationMark = configurationMark.split(':');

        const shortTextMark = splittedConfigurationMark[0];
        const longTextMark = splittedConfigurationMark[1];

        const splittedLongTextMark = longTextMark.split('(');

        if (splittedLongTextMark.length > 2) {
            console.log('1. fromRaw(): ', splittedLongTextMark.length, configurationMark);
            return null;
        }

        const shortIndex = MarkUtils.extractShortMarkIndex(shortTextMark);

        if (shortIndex == null) {
            console.log('2. fromRaw(): ', shortIndex, shortTextMark);
            return null;
        }

        mark.shortIndex = shortIndex;
        mark.parts = splittedLongTextMark[0].split('.');
        mark.types = (splittedLongTextMark[1]?.split(',') ?? [])
            .map(rawType => {
                const splittedRawType = rawType.split('=');

                if (splittedRawType.length !== 2) {
                    console.log('3. fromRaw(): ', splittedRawType.length, configurationMark);
                    return null;
                }

                const markType = new MarkType({
                    name: splittedRawType[0],
                    value: splittedRawType[1]
                });

                return markType;
            })
            .filter((markType): markType is MarkType => { // TODO GDER : mark
                return markType != null;
            });

        return mark;
    }

}