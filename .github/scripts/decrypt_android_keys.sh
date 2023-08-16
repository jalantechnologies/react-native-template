echo "$RELEASE_KEYSTORE" > upload-keystore.jks.asc 
gpg -d --passphrase="$RELEASE_KEYSTORE_PASSPHRASE" --batch upload-keystore.jks.asc > opt/app/android/fastlane/config/upload-keystore.jks

echo "$SERVICE_ACCOUNT" > service-account.json.asc 
gpg -d --passphrase="$SERVICE_ACCOUNT_PASSPHRASE" --batch service-account.json.asc > opt/app/android/fastlane/config/service-account.json 

rm upload-keystore.jks.asc service-account.json.asc
