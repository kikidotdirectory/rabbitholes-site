// Build in Eastern time so post dates format as the intended day.
process.env.TZ = "America/New_York";

import lume from "@lumeland/lume";
import date from "@lumeland/plugin-date";
import footnotes from "@lumeland/plugin-markdown-footnotes";
import markdownItWikilinks from "markdown-it-wikilinks";

const markdown = {
	"options": {
		typographer: true,
		linkify: true,
	},
	plugins: [markdownItWikilinks({
		baseURL: "/articles/",
		makeAllLinksAbsolute: true,
		uriSuffix: "",
	})],
};

const site = lume({ "src": "src" }, { markdown });

site.use(date({
	formats: {
		"HUMAN_SHORT_DATE": "PP",
	},
}));

site.use(footnotes({
	referenceFn: (label: string, attrs: Record<string, string>) =>
		`<sup><a ${Object.entries(attrs).map(([key, value]) => `${key}="${value}"`).join(" ")}>[${label}]</a></sup>`,
}));

// Front matter like `date: 2026-11-17` is parsed as midnight UTC.
// Reinterpret date-only values as midnight Eastern instead.
site.preprocess([".md"], (pages) => {
	for (const page of pages) {
		const d = page.data.date;
		if (
			d instanceof Date && d.getUTCHours() === 0 && d.getUTCMinutes() === 0 &&
			d.getUTCSeconds() === 0 && d.getUTCMilliseconds() === 0
		) {
			page.data.date = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
		}
	}
});

site.add("style.css");

export default site;
