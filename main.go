package main

import (
	"fmt"
	"net/http"
	"github.com/bobilev/google-translate-mini/handler"
)

func main() {
	port := "3000"
	//port := os.Getenv("PORT")
	//if port == "" {
	//	log.Fatal("$PORT must be set")
	//}


	//err := dbwork.CreateAllTable()
	//checkErr(err)

	fmt.Println("[server start] port:",port)

	http.HandleFunc("/", handler.TMPIndex)
	http.HandleFunc("/api", handler.API)


	http.Handle("/dist/", http.StripPrefix("/dist/", http.FileServer(http.Dir("./front/dist"))))
	http.ListenAndServe(":" + port, nil)
}



func checkErr(err error) {
	if err != nil {
		fmt.Println("[err][CreateAllTable]")
		panic(err)
	} else {
		fmt.Println("[good][CreateAllTable]")
	}
}
