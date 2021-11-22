import { Command } from 'commander';
import { serve } from '../commands/serve'
import { error } from './error'
import { defaultSettings } from '../lib/defaultValues'
import fs from 'fs'

const program = new Command();
program
    .name('serve')
    .arguments('<source>')
    .description('serve your map locally')
    .action((source: string) => {
        const options = program.opts()
        if (! fs.existsSync(defaultSettings.configFile)) {
        fs.writeFileSync(defaultSettings.configFile, `provider: ${options.provider || 'default'}`)
        }
        try {
        serve(source, program.opts())
        } catch(e) {
        error(e)
        }
    })

export default program