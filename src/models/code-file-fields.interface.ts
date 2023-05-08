import { CodeLanguage } from "src/enums/code-language.enum";

export interface CodeFileFields {

    code: string;

    fileName: string;

    language: CodeLanguage;

}