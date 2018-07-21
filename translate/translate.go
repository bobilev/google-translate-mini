package translate

import (
	"cloud.google.com/go/translate"
	"log"
	"golang.org/x/text/language"
	"fmt"
	"golang.org/x/net/context"
	"github.com/bobilev/google-translate-mini/types"
	"google.golang.org/api/option"
	"os"
)

func TranslateText(Original types.Original) types.Translate{
	ctx := context.Background()

	// Creates a client.
	//client, err := translate.NewClient(ctx)
	apiKey := os.Getenv("GOOGLE_KEY_API")
	if apiKey == "" {
		log.Fatal("$apiKey must be set")
	}
	//const apiKey = "AIzaSyBV4HrmWqGssgG69W2_Ur160O_T2Jij_LM"
	client, err := translate.NewClient(ctx, option.WithAPIKey(apiKey))
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}

	// Sets the text to translate.
	text := Original.Text
	// Sets the target language.
	target, err := language.Parse(Original.Translate)
	if err != nil {
		log.Fatalf("Failed to parse target language: %v", err)
	}

	// Translates the text into Russian.
	translations, err := client.Translate(ctx, []string{text}, target, nil)
	if err != nil {
		log.Fatalf("Failed to translate text: %v", err)
	}
	var Translate types.Translate
	Translate.LanguageDetect = translations[0].Source.String()
	Translate.Text = translations[0].Text
	//fmt.Printf("Text: %v\n", text)
	//fmt.Printf("Translation: %v\n", translations[0].Text)
	//fmt.Printf("Translation: %v\n", translations[0].Source.String())
	return Translate
}
func DetectLanguage(text string) (*translate.Detection, error) {
	ctx := context.Background()
	client, err := translate.NewClient(ctx)
	if err != nil {
		return nil, err
	}
	defer client.Close()

	lang, err := client.DetectLanguage(ctx, []string{text})
	if err != nil {
		return nil, err
	}
	fmt.Println("lang",lang)
	return &lang[0][0], nil
}
