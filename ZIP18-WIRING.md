# ZIP18 Wiring (Optional)

## 1) Include CSS once
Import in your main CSS entry (e.g. src/index.css):
@import "./styles/creditchain-focus.css";

## 2) Mark clickable divs as focusable (if you have any)
className="cc-focusable"

## 3) Keyboard activation helper
import { onEnterOrSpace } from "../lib/a11y";
<div role="button" tabIndex={0} onKeyDown={onEnterOrSpace(onClick)} />

## 4) SafeArea wrapper (Telegram iOS)
import SafeArea from "./components/SafeArea";
<SafeArea><App /></SafeArea>
