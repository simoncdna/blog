import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { locales, type Locale } from "../../i18n/config";
import { useTranslations } from "../../i18n/utils";
import { getAllPosts } from "../../lib/posts";

export function getStaticPaths() {
	return locales.map((locale) => ({ params: { locale } }));
}

export async function GET(context: APIContext) {
	const locale = context.params.locale as Locale;
	const t = useTranslations(locale);
	const posts = await getAllPosts({ locale });

	return rss({
		title: t("rss.title"),
		description: t("rss.description"),
		site: context.site!,
		items: posts.slice(0, 20).map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.creationDate,
			link: `/${locale}/posts/${post.data.id}/`,
		})),
	});
}
