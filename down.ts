import { fetch } from 'bun'
const imglinks = [
  'https://cdn.openart.ai/chat_to_edit/character_style/ghibli.webp',
  'https://cdn.openart.ai/chat_to_edit/character_style/humanize.webp',
  'https://cdn.openart.ai/chat_to_edit/character_style/pixar.webp',
  'https://cdn.openart.ai/chat_to_edit/character_style/3d_chibi.webp',
  'https://cdn.openart.ai/chat_to_edit/character_style/pop_mart.webp',
  'https://cdn.openart.ai/chat_to_edit/character_style/anime.webp',
  'https://cdn.openart.ai/chat_to_edit/character_style/cartoon.webp',
  'https://cdn.openart.ai/chat_to_edit/character_style/manga.webp',
  'https://cdn.openart.ai/chat_to_edit/character_style/3d_chibi_on_polaroid.webp',
  'https://cdn.openart.ai/chat_to_edit/character_style/action_figure.webp',
  'https://cdn.openart.ai/chat_to_edit/character_style/lego.webp',
  'https://cdn.openart.ai/chat_to_edit/character_style/funko_pop.webp',
  'https://cdn.openart.ai/chat_to_edit/character_style/sesame.webp',
  'https://cdn.openart.ai/chat_to_edit/character_style/south_park.webp',
  'https://cdn.openart.ai/chat_to_edit/character_style/simpson.webp',
  'https://cdn.openart.ai/chat_to_edit/character_style/family_guy.webp',
  'https://cdn.openart.ai/chat_to_edit/character_style/snoopy.webp',
  'https://cdn.openart.ai/chat_to_edit/character_style/barbie.webp',
  'https://cdn.openart.ai/chat_to_edit/character_style/roblox_character.webp',
  'https://cdn.openart.ai/chat_to_edit/character_style/minecraft.webp',
  'https://cdn.openart.ai/chat_to_edit/character_style/pixel_art.webp',
  'https://cdn.openart.ai/chat_to_edit/character_style/gta.webp',
  'https://cdn.openart.ai/chat_to_edit/character_style/avatar.webp',
  'https://cdn.openart.ai/chat_to_edit/character_style/3d_clay.webp',
  'https://cdn.openart.ai/chat_to_edit/character_style/claymation.webp',
  'https://cdn.openart.ai/chat_to_edit/character_style/crochet.webp',
  'https://cdn.openart.ai/chat_to_edit/character_style/low_poly.webp',
  'https://cdn.openart.ai/chat_to_edit/character_style/puppet.webp',
  'https://cdn.openart.ai/chat_to_edit/character_style/balloon_animal.webp',
  'https://cdn.openart.ai/chat_to_edit/character_style/crystal_ball.webp',
  'https://cdn.openart.ai/chat_to_edit/character_style/flat_illustration.webp',
  'https://cdn.openart.ai/chat_to_edit/character_style/chibi_sticker.webp',
  'https://cdn.openart.ai/chat_to_edit/character_style/irasutoya.webp',
  'https://cdn.openart.ai/chat_to_edit/character_style/sticker_pack.webp',
  'https://cdn.openart.ai/chat_to_edit/character_style/doodle.webp',
  'https://cdn.openart.ai/chat_to_edit/character_style/impressionist.webp',
  'https://cdn.openart.ai/chat_to_edit/character_style/pop_art.webp',
  'https://cdn.openart.ai/chat_to_edit/character_style/american_comic.webp',
  'https://cdn.openart.ai/chat_to_edit/character_style/keith_haring.webp',
  'https://cdn.openart.ai/chat_to_edit/character_style/paper_craft.webp',
]

// download all images and keep the name of the image
// add index to the filename
for (const [index, link] of imglinks.entries()) {
  const res = await fetch(link)
  const blob = await res.blob()
  const filename = link.split('/').pop() || 'image.webp'
  const file = new File([blob], filename, { type: 'image/webp' })
  // save the file to the example directory
  await Bun.write(`example/${index + 1} - ${filename}`, file)
}
