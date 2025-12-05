// Enhanced BibTeX parser with URL and abstract support
class BibtexParser {
    constructor() {
        this.entries = [];
    }

    parse(bibtexString) {
        this.entries = [];
        
        // Match all @article, @inproceedings, @phdthesis entries
        const entryRegex = /@(\w+)\{([^,]+),\s*([\s\S]*?)\n\}/g;
        let match;

        while ((match = entryRegex.exec(bibtexString)) !== null) {
            const type = match[1];
            const key = match[2];
            const fields = match[3];
            
            const entry = this.parseFields(fields);
            entry.type = type;
            entry.key = key;
            
            this.entries.push(entry);
        }

        return this.entries;
    }

    parseFields(fieldsString) {
        const entry = {};
        
        // Match field = {value} or field = "value", handling multi-line values
        const fieldRegex = /(\w+)\s*=\s*\{([^}]*)\}|(\w+)\s*=\s*"([^"]*)"/g;
        let match;

        while ((match = fieldRegex.exec(fieldsString)) !== null) {
            const fieldName = match[1] || match[3];
            const fieldValue = match[2] || match[4];
            
            if (fieldName === 'tags') {
                // Split tags by comma
                entry[fieldName] = fieldValue.split(',').map(tag => tag.trim());
            } else if (fieldName === 'abstract') {
                // Clean up abstract formatting
                entry[fieldName] = fieldValue.trim().replace(/\s+/g, ' ');
            } else {
                entry[fieldName] = fieldValue;
            }
        }

        return entry;
    }

    formatEntry(entry) {
        let formatted = {
            title: entry.title || '',
            authors: entry.author ? entry.author.replace(/ and /g, ', ') : '',
            year: parseInt(entry.year) || 0,
            journal: '',
            tags: entry.tags || [],
            url: entry.url || (entry.doi ? `https://doi.org/${entry.doi}` : ''),
            abstract: entry.abstract || 'No abstract available.',
            key: entry.key || ''
        };

        // Format journal string based on entry type
        if (entry.type === 'article') {
            let journalParts = [entry.journal];
            
            if (entry.volume) journalParts.push(`Vol. ${entry.volume}`);
            if (entry.number) journalParts.push(`No. ${entry.number}`);
            if (entry.pages) journalParts.push(`pp. ${entry.pages}`);
            if (entry.doi) journalParts.push(`doi:${entry.doi}`);
            
            formatted.journal = journalParts.filter(p => p).join(', ');
        } else if (entry.type === 'inproceedings') {
            let journalParts = [entry.booktitle];
            if (entry.pages) journalParts.push(`pp. ${entry.pages}`);
            formatted.journal = journalParts.filter(p => p).join(', ');
        } else if (entry.type === 'phdthesis') {
            formatted.journal = entry.school + ' (PhD Thesis)';
        }

        return formatted;
    }

    getFormattedPublications() {
        return this.entries.map(entry => this.formatEntry(entry));
    }
}