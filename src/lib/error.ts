export const error = (e: unknown) => {
  if (e instanceof Error) {
    console.error(e.message)
  } else {
    console.error(String(e))
  }
  process.exit(1)
}
