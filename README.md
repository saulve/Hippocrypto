# Hippocrypto - experimental web page

Hippocrypto was created as an experiment to evaluate if cryptocurrency mining in the browser could be a feasible alternative to online advertisement. The experiment ran for 4 weeks and attracted 107 participants. The results of the experiment (including visualisations) can be found in _results-and-visualisations.zip_ file.

## How to view the results

Unfortunately, at the moment the only way to view the results is to spin up an [ELK](https://www.elastic.co/elk-stack) server and import a snapshot that is contained within the _results-and-visualisations.zip_ file. The file contains a complete snapshot of the server as well as visualisations that can be imported to view the data.

Instructions on how to restore the snapshot can be found [here](https://qbox.io/blog/elasticsearch-data-snapshots-restore-tutorial).

**Note:** the `path.repo` configuration used when creating a snapshot was set to `path.repo: ["/var/log/elastic/backup"]`. The name of the snapshot itself is _hippocrypto_. 