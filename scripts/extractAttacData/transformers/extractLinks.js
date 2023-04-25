const markdownUrlRegexp = new RegExp(/\[\[([^\]]*)\]\]/g);
const urlRegexp = new RegExp(/(?<!{{)(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])(?!}})/ig);

export default (previous) => previous.map(event => {
  const updatedEvent = {
    ...event,
    links: event.links || [],
  };

  let urls;
  while ((urls = markdownUrlRegexp.exec(event.description)) !== null) {
    updatedEvent.links.push(urls[1]);
    updatedEvent.description = updatedEvent.description.replace(urls[0], '');
  }

  urls = undefined;
  while ((urls = urlRegexp.exec(updatedEvent.description)) !== null) {
    updatedEvent.links.push(urls[0]);
    updatedEvent.description = updatedEvent.description.replace(urls[0], '');
  }
  return updatedEvent;
});