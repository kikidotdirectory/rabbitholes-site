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

site.use(footnotes());
site.use(date({
	formats: {
		"HUMAN_SHORT_DATE": "PPP",
	},
}));

site.add("style.css");

export default site;
