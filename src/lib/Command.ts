'use strict';

abstract class AbstractCommand {
  constructor() {

  }

  abstract description: string
  abstract usage: string
  abstract run(): void
}

export default AbstractCommand
