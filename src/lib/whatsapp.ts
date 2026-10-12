import { property } from '../data/casaSelva'

/** Opens a chat with the agent (or lets the user pick a chat when no number is configured). */
export function whatsappChatUrl(text: string) {
  const number = property.contact.whatsappNumber.replace(/\D/g, '')
  const encoded = encodeURIComponent(text)
  return number ? `https://wa.me/${number}?text=${encoded}` : `https://wa.me/?text=${encoded}`
}

/** Share link: always lets the user pick the recipient. */
export function whatsappShareUrl(text: string) {
  return `https://wa.me/?text=${encodeURIComponent(text)}`
}
