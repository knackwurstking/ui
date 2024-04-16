import * as svg from "../../svg";

const innerHTML = `
<div
    class="ui-input-select-options"
    onclick='event.currentTarget.parentElement.classList.toggle("open")'
>
   	<div class="ui-input-select-icon">${svg.ChevronDown}</div>

    <!-- append option items in here, always use class ".ui-input-select-option" for that
</div>
`;

export default innerHTML;
