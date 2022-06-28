import { html, LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { VersionSelectorStyles } from './VersionSelector.styles';

/**
 * Version selector for documentation site layout.
 */
export class VersionSelector extends LitElement {
  static styles = VersionSelectorStyles;

  @property({ type: Array })
  versions: string[] = [];

  @property()
  selected?: string;

  @property({ attribute: 'latest-label' })
  latestLabel: string | ((version: string) => string) = (version) =>
    `${version} (latest)`;

  private sortedVersions: string[] = [];

  private latest: string;

  connectedCallback(): void {
    super.connectedCallback();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  update(changedProperties: PropertyValues): void {
    if (changedProperties.has('versions')) {
      this.sortedVersions = this.versions.sort().reverse();
      this.latest = this.sortedVersions[0];
      this.selected ??= this.sortedVersions[0];
    }
    super.update(changedProperties);
  }

  render() {
    return html`<select
      @change=${(event) => this.onVersionSelect(event)}
      aria-label="Select version"
    >
      ${this.sortedVersions.map(
        (version) =>
          html`<option
            value="${version}"
            ?selected=${this.selected === version}
          >
            ${version === this.latest ? this.getLatestLabel() : version}
          </option>`
      )}
    </select>`;
  }

  protected getLatestLabel(): string {
    return typeof this.latestLabel === 'string'
      ? this.latestLabel
      : this.latestLabel(this.latest);
  }

  protected onVersionSelect(event: Event): void {
    if (event.target instanceof HTMLSelectElement) {
      const $selectedOption = event.target.selectedOptions[0];
      this.dispatchEvent(
        new CustomEvent('select', {
          detail: {
            version: $selectedOption.value,
            isLatest: $selectedOption.value === this.latest,
          },
        })
      );
    }
  }
}
