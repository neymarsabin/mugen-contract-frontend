const TwitchLiveChat = () => {
	return (
		<div className="chat-box">
			<iframe
				src="https://www.twitch.tv/embed/random_channel/chat?parent=randomdomain.com"
				title={"twitch-chat-embed"}
				height="100%"
        width="98%"
			></iframe>
		</div>
	);
};

export default TwitchLiveChat;
