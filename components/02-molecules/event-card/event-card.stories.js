import { dateIsValid, generateImage, generateSlots, knobBoolean, knobNumber, knobRadios, knobText, randomSentence, randomTags, randomUrl, shouldRender } from '../../00-base/base.utils';

import CivicThemeEventCard from './event-card.twig';

export default {
  title: 'Molecules/Event Card',
  parameters: {
    layout: 'centered',
  },
};

export const EventCard = (props = {}) => {
  const knobs = {
    theme: knobRadios(
      'Theme',
      {
        Light: 'light',
        Dark: 'dark',
      },
      'light',
      props.theme,
      props.knobTab,
    ),
    date: knobText('Date', '20 Jan 2023 11:00', props.date, props.knobTab),
    date_end: knobText('End date', '21 Jan 2023 15:00', props.date_end, props.knobTab),
    title: knobText('Title', 'Event name which runs across two or three lines', props.card_title, props.knobTab),
    location: knobText('Location', 'Suburb, State – 16:00–17:00', props.location, props.knobTab),
    summary: knobText('Summary', randomSentence(), props.summary, props.knobTab),
    link: {
      url: knobText('Link URL', randomUrl(), props.link_url, props.knobTab),
      is_external: knobBoolean('Link is external', false, props.link_is_external, props.knobTab),
      is_new_window: knobBoolean('Open in a new window', false, props.link_is_new_window, props.knobTab),
    },
    image: knobBoolean('With image', true, props.with_image, props.knobTab) ? {
      url: generateImage(),
      alt: 'Image alt text',
    } : null,
    tags: randomTags(knobNumber(
      'Number of tags',
      2,
      {
        range: true,
        min: 0,
        max: 10,
        step: 1,
      },
      props.number_of_tags,
      props.knobTab,
    ), true),
    modifier_class: `story-wrapper-size--small ${knobText('Additional class', '', props.modifier_class, props.knobTab)}`,
    attributes: knobText('Additional attributes', '', props.attributes, props.knobTab),
  };

  knobs.date_iso = dateIsValid(knobs.date) ? new Date(knobs.date).toISOString() : null;
  knobs.date_end_iso = dateIsValid(knobs.date_end) ? new Date(knobs.date_end).toISOString() : null;

  return shouldRender(props) ? CivicThemeEventCard({
    ...knobs,
    ...generateSlots([
      'image_over',
      'content_top',
      'content_middle',
      'content_bottom',
    ]),
  }) : knobs;
};
