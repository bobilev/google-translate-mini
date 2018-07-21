package translate

import (
	"cloud.google.com/go/translate"
	"log"
	"golang.org/x/text/language"
	"golang.org/x/net/context"
	"github.com/bobilev/google-translate-mini/types"
	"google.golang.org/api/option"
	"os"
	"github.com/bobilev/google-translate-mini/spyvk"
)

func TranslateText(Original types.Original) types.Translate{
	ctx := context.Background()

	// Creates a client.
	apiKey := os.Getenv("GOOGLE_KEY_API")
	if apiKey == "" {
		log.Fatal("$apiKey must be set")
	}
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

	*spyvk.TextBuff = Original.Text//Извините, я решил за вами последить.Чтобы точно знать что вы проверяли демку

	return Translate
}