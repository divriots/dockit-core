import { css } from 'lit';

export const SearchStyles = css`
:host {
  position: relative;
  flex-grow: 1;
  margin: 0 4rem 0 1rem;
}

@media only screen and (max-width: 1024px) :host {
  margin: 0px;
}

form {
  z-index: 11;
  display: flex;
  align-items: center;
}

form label {
  position: relative;
  width: 100%;
}

form label:before {
  content: '';
  z-index: 12;s
  position: absolute;
  left: 10px;
  top: 0;
  bottom: 0;
  width: 20px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 20 20' fill-rule='evenodd'%3E%3Cpath d='M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z' stroke='gray' fill='none' fill-rule='evenodd' stroke-linecap='round' stroke-linejoin='round' %3E%3C/path%3E%3C/svg%3E")
    center / contain no-repeat;
}
  
form input[type='search'] {
  border: 1px solid var(--dockit-layout-header-border-color);
  border-radius: 0.5rem;
  padding: 0.5rem;
  padding-left: 2.5rem;
  width: 100%;
  z-index: 11;
  position: relative;
  background: var(--dockit-layout-bg);
  font-size: large;
  color: inherit;
}

form input[type='search']:focus {
  outline: 1px solid var(--dockit-layout-accent);
}

.overlay {
  display: none;
  position: fixed;
  z-index: 10;
  background-color: #1f1f1f0f;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.hits {
  display: none;
  position: absolute;
  right: 0;
  left: 0;
  list-style: none;
  overflow: auto;
  max-height: 70vh;
  border: 1px solid var(--dockit-layout-header-border-color);
  background: var(--dockit-layout-bg);
  z-index: 11;
  border-radius: 0.5rem;
  padding: 0.5rem;
}
@media only screen and (max-width: 768px) hits{
  position: fixed;
}

.hits a {
  overflow: hidden;
  text-overflow: ellipsis;
  color: inherit;
  text-decoration: none;
  display: block;
  border-radius: 0.25rem;
  padding: 0.5rem 0.25rem;
  border: 1px solid transparent;
}

.hits a:hover {
  border-color: var(--dockit-layout-accent);
}

.hits li {
  border-bottom: 1px solid var(--dockit-layout-header-border-color);
  margin: 0.25rem 0;
}

.hits header {
  font-weight: 600;
}

.hits header .tags {
  font-size: small;
  opacity: 0.7;
  float: right;
}

.hits header .tags > * {
  background: #80808040;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}
.hits .content {
  font-size: 80%;
  font-family: sans-serif !important;
}

.hits .highlight {
  color: var(--dockit-layout-accent);
}`;
