export const truncateMiddle = (text, maxLength = 10, ellipsis = '...') => {
  const str = String(text)

  if (str.length <= maxLength) return str

  if (maxLength <= ellipsis.length) {
    return ellipsis.length >= str.length ? str : ellipsis
  }

  const charsToShow = maxLength - ellipsis.length
  const frontChars = Math.ceil(charsToShow / 2)
  const backChars = Math.floor(charsToShow / 2)

  return (
    str.substring(0, frontChars) +
    ellipsis +
    str.substring(str.length - backChars)
  )
}
