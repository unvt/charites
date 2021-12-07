export const error = (e: unknown) => {
  if (e instanceof TypeError) {
    console.error(e.message)
  }
  process.exit(1)
}
