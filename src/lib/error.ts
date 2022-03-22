export const error = (e: unknown) => {

  if (e instanceof TypeError) {
    console.error(e.message)
  } else if (typeof e === 'string') {
    console.error(e)
  }

  process.exit(1)
}
