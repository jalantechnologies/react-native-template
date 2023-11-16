echo "$RELEASE_KEYSTORE" > release.keystore.asc 
gpg -d --passphrase="$RELEASE_KEYSTORE_PASSPHRASE" --batch release.keystore.asc > android/fastlane/config/release.keystore 

echo "$SERVICE_ACCOUNT" > service-account.json.asc 
gpg -d --passphrase="$SERVICE_ACCOUNT_PASSPHRASE" --batch service-account.json.asc > android/fastlane/config/service-account.json 

rm release.keystore.asc service-account.json.asc
