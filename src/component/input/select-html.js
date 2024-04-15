import { svg } from "../..";

export default `
<div
    class="ui-input-select-options"
    onclick='event.currentTarget.parentElement.classList.toggle("open")'
>
   	<div class="ui-input-select-icon">
        <!-- TODO: Put some "chevron down" svg icon in here - ChevronDown height="100%" width="100%" /-->
   	</div>

    <!-- append option items in here, always use class ".ui-input-select-option" for that
</div>
`;
