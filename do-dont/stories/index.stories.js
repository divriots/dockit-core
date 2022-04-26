import '~/do-dont/define-all.js';

export default {
  parameters: {
    layout: 'centered',
  },
};

const sampleButton = /*html*/ `<div
  slot="component"
  style="background-color: #00000030; padding: .5rem; font-weight: 600; border-radius: .25rem;"
>
  SAMPLE BUTTON
</div>`;

export const do_ = () => /*html*/ `
  <dockit-do>
    <ul slot="instructions">
      <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
      <li>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
      </li>
      <li>Duis aute irure dolor in reprehenderit in voluptate velit</li>
    </ul>
  </dockit-do>
`;

export const do_with_component = () => /*html*/ `
    <dockit-do>
      ${sampleButton}
      <ul slot="instructions">
        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
        <li>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
        </li>
        <li>Duis aute irure dolor in reprehenderit in voluptate velit</li>
      </ul>
    </dockit-do>
  `;

export const dont = () => /*html*/ `
  <dockit-dont>
    <ul slot="instructions">
      <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
      <li>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
      </li>
      <li>Duis aute irure dolor in reprehenderit in voluptate velit</li>
    </ul>
  </dockit-dont>
`;

export const dont_with_component = () => /*html*/ `
    <dockit-dont>
      ${sampleButton}
      <ul slot="instructions">
        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
        <li>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
        </li>
        <li>Duis aute irure dolor in reprehenderit in voluptate velit</li>
      </ul>
    </dockit-dont>
  `;

export const do_custom = () => /*html*/ `
  <dockit-do
    style="--dockit-do-color: #fcba03"
    label=${'HINTS'}
  >
    <svg
      slot="icon"
      width="24"
      height="24"
      viewBox="0 0 16 16"
      fill="currentColor"
      class="play"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.6 1c1.6.1 3.1.9 4.2 2 1.3 1.4 2 3.1 2 5.1 0 1.6-.6 3.1-1.6 4.4-1 1.2-2.4 2.1-4 2.4-1.6.3-3.2.1-4.6-.7-1.4-.8-2.5-2-3.1-3.5C.9 9.2.8 7.5 1.3 6c.5-1.6 1.4-2.9 2.8-3.8C5.4 1.3 7 .9 8.6 1zm.5 12.9c1.3-.3 2.5-1 3.4-2.1.8-1.1 1.3-2.4 1.2-3.8 0-1.6-.6-3.2-1.7-4.3-1-1-2.2-1.6-3.6-1.7-1.3-.1-2.7.2-3.8 1-1.1.8-1.9 1.9-2.3 3.3-.4 1.3-.4 2.7.2 4 .6 1.3 1.5 2.3 2.7 3 1.2.7 2.6.9 3.9.6z"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6 5l.777-.416 4.5 3v.832l-4.5 3L6 11V5zm1 .934v4.132L10.099 8 7 5.934z"
      />
    </svg>
    <ul slot="instructions">
      <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
      <li>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
      </li>
      <li>Duis aute irure dolor in reprehenderit in voluptate velit</li>
    </ul>
  </dockit-do>
`;

export const do_custom_color = () => /*html*/ `
  <dockit-do style="--dockit-do-color: #fcba03" label="HINTS">
    <ul slot="instructions">
      <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
      <li>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
      </li>
      <li>Duis aute irure dolor in reprehenderit in voluptate velit</li>
    </ul>
  </dockit-do>
`;

export const do_themed = () => /*html*/ `
    <style>
      .themed-do {
        --dockit-do-color: #000080;
      }
      .themed-do::part(container) {
        border-style: solid;
        border-width: 2px;
        border-color: #000080;
        border-radius: 1rem;
      }
      .themed-do::part(component-container) {
        background-color: #00008020;
      }
      .themed-do::part(instructions-container) {
        background-color: #00008040;
      }
    </style>
    <dockit-do class="themed-do" label="NAVY BLUE">
      ${sampleButton}
      <ul slot="instructions">
        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
        <li>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
        </li>
        <li>Duis aute irure dolor in reprehenderit in voluptate velit</li>
      </ul>
    </dockit-do>
  `;
