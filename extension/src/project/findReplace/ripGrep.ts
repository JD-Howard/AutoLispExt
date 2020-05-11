import { rgPath } from 'vscode-ripgrep'
import { SearchOption } from './options';

import * as execa from "execa";

export async function findInFile(searchOption: SearchOption, file2Search: string) {
    let commandArgs: string[] = [
        searchOption.keyword,
        file2Search,
        "--column",
        "--line-number",
        "--color",
        "never",
        "--no-heading",
        "--encoding",
        "utf8"
    ];

    if (SearchOption.activeInstance.matchCase)
        commandArgs.push('--case-sensitive');
    else
        commandArgs.push('--ignore-case');

    if (SearchOption.activeInstance.matchWholeWord)
        commandArgs.push('--word-regexp');

    if (SearchOption.activeInstance.useRegularExpr)
        commandArgs.push('--no-fixed-strings');
    else
        commandArgs.push('--fixed-strings');

    if (SearchOption.activeInstance.isReplace && (SearchOption.activeInstance.replacement != null)) {
        commandArgs.push('--replace');
        commandArgs.push(SearchOption.activeInstance.replacement);
    }

    return execa(
        rgPath,
        commandArgs
    );
}