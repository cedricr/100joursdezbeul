const markdownUrlRegexp = new RegExp(/\[\[([^\]]*)\]\]/g);
const urlRegexp = new RegExp(/(?<!{{)(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])(?!}})/ig);

export default (previous) => previous.map(event => {
  const updatedEvent = {
    ...event,
    liens: event.liens || [],
  };

  let urls;
  while ((urls = markdownUrlRegexp.exec(event.description)) !== null) {
    updatedEvent.liens.push(urls[1]);
    updatedEvent.description = updatedEvent.description.replace(urls[0], '');
  }

  urls = undefined;
  while ((urls = urlRegexp.exec(updatedEvent.description)) !== null) {
    updatedEvent.liens.push(urls[0]);
    updatedEvent.description = updatedEvent.description.replace(urls[0], '');
  }
  return updatedEvent;
});