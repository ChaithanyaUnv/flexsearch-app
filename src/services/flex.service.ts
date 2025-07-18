import { Injectable } from '@angular/core';
import FlexSearch from 'flexsearch';

interface FileDoc {
  name: string;
content: string;
[key: string]: string;
}
@Injectable({
  providedIn: 'root'
})
export class FlexService {
  private index: any;

  private files: FileDoc[] = [
    { name: 'file1.txt', content: 'This is a sample file about JavaScript and search.' },
    { name: 'file2.txt', content: 'Another document mentioning Node.js and async operations.' },
    { name: 'readme.md', content: 'Installation and usage instructions for your app.' }
  ];

  constructor() {
    this.index = new FlexSearch.Document<FileDoc>({
        tokenize: 'forward',   // for partial/prefix matches
        encode: (text: string) => text.toLowerCase().split(/\s+/),
       // case-insensitive matching
      document: {
        id: 'name',
        index: ['content']
      }
    });

    for (const file of this.files) {
  this.index.add(file);
}
    console.log('Index created with files:', this.files.map(file => file.name + ': ' + file.content));
  }

  async search(query: string): Promise<FileDoc[]> {
  const results = await this.index.search(query, { enrich: true });
  console.log('FULL RAW SEARCH RESULT', results);

  // Flatten results
  const flatResults = results.flatMap((r: any) => r.result);

  // 1. If .doc is present, get .doc
  // 2. If only IDs are present, look up documents by ID
  const docs: FileDoc[] = flatResults.map((res: any) => {
    if (res && res.doc) return res.doc;   // enriched return
    if (typeof res === "string") {        // only ID returned
      return this.files.find(f => f.name === res)!;
    }
    return null;
  }).filter((doc:any): doc is FileDoc => !!doc);

  console.log('Search results for query:', query, docs);
  return docs;
}

} 
