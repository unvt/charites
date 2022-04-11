export const error = (e: unknown) => {
  if (e instanceof TypeError) {
    console.error(e.message)
  } else {
    // @ts-ignore
    console.error(e.toString())
  }
  process.exit(1)
}
