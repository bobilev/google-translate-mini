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


	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Println(err)
	}
	var Original types.Original
	jsonRes := []byte(body)
	err1 := json.Unmarshal(jsonRes, &Original)
	if err1 != nil {
		log.Println(err1)
	}
	fmt.Println("Original",Original)
	resultTranslate := translate.TranslateText(Original)
	json.NewEncoder(w).Encode(resultTranslate)
	w.WriteHeader(200)

	//switch class {
	//case "account":
	//	switch method {
	//	case "getinfo":
	//		//user := r.URL.Query().Get("user")
	//		json.NewEncoder(w).Encode("account")
	//		w.WriteHeader(200)
	//	}
	//case "store":
	//	switch method {
	//	case "getstoresuser":
	//		user := r.URL.Query().Get("user")
	//		res := dbwork.SelectStores(user)
	//		json.NewEncoder(w).Encode(res)
	//		w.WriteHeader(200)
	//	case "addstore":
	//		name := r.URL.Query().Get("name")
	//		media := r.URL.Query().Get("media")
	//		author := r.URL.Query().Get("author")
	//		direction := r.URL.Query().Get("direction")
	//		description := r.URL.Query().Get("description")
	//
	//		res := dbwork.CreateNewStore(name,media,author,direction,description)
	//		json.NewEncoder(w).Encode(res)
	//		w.WriteHeader(200)
	//	case "editstore":
	//		mapParams := make(map[string]string)
	//		mapParams["storeid"] = r.URL.Query().Get("storeid")
	//		mapParams["name"] = r.URL.Query().Get("name")
	//		mapParams["media"] = r.URL.Query().Get("media")
	//		mapParams["direction"] = r.URL.Query().Get("direction")
	//		mapParams["description"] = r.URL.Query().Get("description")
	//		//mapParams["genre"] = r.URL.Query().Get("genre")
	//		mapParams["restriction"] = r.URL.Query().Get("restriction")
	//
	//		res := dbwork.EditStore(mapParams)
	//		json.NewEncoder(w).Encode(res)
	//		w.WriteHeader(200)
	//	}
	//case "step":
	//	switch method {
	//	case "getsteps":
	//		StoreId := r.URL.Query().Get("storeid")
	//		fmt.Println("StoreId",StoreId)
	//		res := dbwork.SelectSteps(StoreId)
	//		json.NewEncoder(w).Encode(res)
	//		w.WriteHeader(200)
	//	case "editsteps":
	//		body, err := ioutil.ReadAll(r.Body)
	//		if err != nil {
	//			log.Println(err)
	//		}
	//		var ArraySave dbtypes.ArraySavePull
	//		jsonRes := []byte(body)
	//		err1 := json.Unmarshal(jsonRes, &ArraySave)
	//		if err1 != nil {
	//			log.Println(err1)
	//		}
	//		//fmt.Println("ArraySavePull",ArraySave)
	//		//fmt.Println("ArraySavePull",ArraySave.Response[0].StepId)
	//		//fmt.Println("ArraySavePull",ArraySave.Response[1].StepId)
	//	}
	//
	//
	//}
}

