import lume from "@lumeland/lume";
import footnotes from "@lumeland/plugin-markdown-footnotes";
import date from "@lumeland/plugin-date"

const markdown = {
	"options": {
		typographer: true,
	},
};

const site = lume({ "src": "src" }, { markdown });

site.use(footnotes());
site.use(date({
	formats: {
    "HUMAN_SHORT_DATE": "PP",
  },
}));

site.add("style.css");

export default site;
