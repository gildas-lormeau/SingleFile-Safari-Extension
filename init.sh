#!/usr/bin/env bash

set -e

# single-file and single-file-core are symlinks to the sibling checkouts when they exist, so a core
# pin bump or a source fix in the MV2 tree reaches Safari in the same round instead of after a push.
# They are cloned only when there is no sibling to link, which is what a fresh machine gets.
link_or_clone() {
    local name=$1
    local repository=$2
    if [ -e "$name" ] || [ -L "$name" ]; then
        echo "$name already exists, leaving it as it is"
    elif [ -d "../$name" ]; then
        ln -s "../$name" "$name"
        echo "$name linked to the sibling checkout"
    else
        git clone "$repository" "$name"
    fi
}

link_or_clone single-file https://github.com/gildas-lormeau/SingleFile.git
link_or_clone single-file-core https://github.com/gildas-lormeau/single-file-core.git

cd single-file
npm i
cd ..
