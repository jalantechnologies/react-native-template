mkdir -p android/fastlane/config
echo "$RELEASE_KEYSTORE" > upload-keystore.jks.asc
gpg -d --passphrase="$RELEASE_KEYSTORE_PASSPHRASE" --batch upload-keystore.jks.asc > android/fastlane/config/upload-keystore.jks

echo "$SERVICE_ACCOUNT" > service-account.json.asc
gpg -d --passphrase="$SERVICE_ACCOUNT_PASSPHRASE" --batch service-account.json.asc > android/fastlane/config/service-account.json

rm upload-keystore.jks.asc service-account.json.asc
