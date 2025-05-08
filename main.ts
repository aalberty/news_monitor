const source_urls: string[] = [
    "apnews.com",
    "reuters.com",
    "pbs.org",
    "npr.org",
    "wsj.com",
    "nytimes.com",
    "washingtonpost.com",
    "thehill.com",
    "usatoday.com",
    "bbc.com",
    "dw.com",
    "aljazeera.com",
    "cbc.ca",
    "theguardian.com",
    "france24.com",
    "freedomhouse.org",
    "hrw.org",
    "amnesty.org",
    "crisisgroup.org",
    "rsf.org",
    "eiu.com",
    "allsides.com",
    "opensecrets.org",
    "vox.com"
];

const test = async () => {
    await fetch("https://apnews.com", {
        headers: {
            "User-Agent": "Mozilla/5.0 (compatible; APNewsBot/1.0)"
        }
    }).then((res) => {
        const reader = res.body?.getReader();
        return new ReadableStream({
            start(controller) {
                return pump();
                function pump() {
                    return reader?.read().then(({done, value}) => {
                        if (done) {
                            controller.close();
                            return;
                        }

                        controller.enqueue(value);
                        return pump();
                    });
                }
            }
        });
    });

}