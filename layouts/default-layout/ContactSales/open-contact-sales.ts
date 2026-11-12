import { CONTACT_SALES_EVENT } from "./contact-sales.constants";

export function openContactSales() {
  window.dispatchEvent(new Event(CONTACT_SALES_EVENT));
}
