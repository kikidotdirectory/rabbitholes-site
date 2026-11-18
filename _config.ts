import lume from "@lumeland/lume";
import date from "@lumeland/plugin-date";
import footnotes from "@lumeland/plugin-markdown-footnotes";
import markdownItWikilinks from "markdown-it-wikilinks";

const markdown = {
	"options": {
		typographer: true,
	},
	plugins: [markdownItWikilinks({
		baseURL: "/articles/",
		makeAllLinksAbsolute: true,
		uriSuffix: "",
	})],
};

const site = lume({ "src": "src" }, { markdown });

site.use(footnotes({
	referenceFn: (label: string, attrs: Record<string, string>) =>
		`<sup><a ${
			Object.entries(attrs).map(([key, value]) => `${key}="${value}"`).join(" ")
		}>[${label}]</a></sup>`,
}));
site.use(date({
	formats: {
		"HUMAN_SHORT_DATE": "PPP",
	},
}));

site.add("style.css");

export default site;
