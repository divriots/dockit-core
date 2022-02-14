const longText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lacinia lacinia est ut elementum. Aenean dignissim augue non nulla rutrum volutpat. Vestibulum semper gravida nunc, sed interdum ligula sodales at. Pellentesque ut urna mattis, consequat lorem sed, viverra neque. Nulla eros ante, facilisis congue mauris ut, finibus pulvinar lacus. Sed eu fringilla nisl. Nunc dignissim felis ut cursus interdum. Vestibulum vulputate elit at ipsum congue dapibus. Sed nec placerat enim, in sagittis libero. Pellentesque maximus scelerisque risus, eu lobortis turpis. Donec elementum euismod lectus, vel interdum tortor euismod nec. Donec quis ex luctus, malesuada orci vitae, finibus dolor. Integer ante augue, egestas quis magna ornare, porta imperdiet risus. Maecenas semper eleifend neque, a eleifend eros porttitor non. Phasellus eu laoreet mi. Aliquam vitae luctus erat.';
const shortText = 'The quick brown fox jumps over the lazy dog.';

export class Text extends HTMLElement {
  connectedCallback() {
    this.innerHTML = this.hasAttribute('long-text') ? longText : shortText;
  }
}
