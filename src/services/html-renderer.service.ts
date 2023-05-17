export class HtmlRendererService {

    // Interface

    public createContainer(parentEl: HTMLElement): HTMLElement {
        const containerEl = parentEl.createEl('div');
        containerEl.style.backgroundColor = 'red';
        containerEl.innerText = 'plop';
    
        return containerEl;
    }

    public clearContainer(containerEl: HTMLElement) {
        containerEl.innerHTML = '';
    }

    public renderButton(
        parentEl: HTMLElement,
        label: string,
        onClickFn: () => void
    ) {
        const buttonEl = parentEl.createEl('button');
        buttonEl.innerText = label;
        buttonEl.addEventListener('click', () => {
            onClickFn();
        });
    }
}