package handler

import (
	"net/http"
	"encoding/json"
	"io/ioutil"
	"log"
	"fmt"
	"github.com/bobilev/google-translate-mini/types"
	"github.com/bobilev/google-translate-mini/translate"
)

func API(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Request-Method", "GET,POST")


	body, err := ioutil.ReadAll(r.Body)//читаем JSON
	if err != nil {
		log.Println(err)
	}
	var Original types.Original
	jsonRes := []byte(body)
	err1 := json.Unmarshal(jsonRes, &Original)//записываем данные из JSON в структуру
	if err1 != nil {
		log.Println(err1)
	}
	fmt.Println("Original",Original)
	resultTranslate := translate.TranslateText(Original)//получаем перевод
	json.NewEncoder(w).Encode(resultTranslate)
	w.WriteHeader(200)
}

