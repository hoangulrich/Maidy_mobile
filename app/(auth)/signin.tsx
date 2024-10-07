import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import logo from "@/assets/images/logo.png";
import AntDesign from "@expo/vector-icons/AntDesign";
import { globalStyles } from "@/global/globalStyles";
import { Link, useRouter } from "expo-router";
import { useSignIn, useOAuth, SignedIn, SignedOut } from "@clerk/clerk-expo";
import SignInWithOAuth from "@/app/(auth)/signInWithOAuth";
import * as Linking from "expo-linking";

export default function Login() {
  // HANDLE LOGIN WITH EMAIL
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLoginPress = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/home/");
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  // HANDLE SOCIAL LOGIN
  const useWarmUpBrowser = () => {
    React.useEffect(() => {
      // Warm up the android browser to improve UX
      // https://docs.expo.dev/guides/authentication/#improving-user-experience
      void WebBrowser.warmUpAsync();
      return () => {
        void WebBrowser.coolDownAsync();
      };
    }, []);
  };

  WebBrowser.maybeCompleteAuthSession();

  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleSocialLogin = React.useCallback(async (platform: string) => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/dashboard", { scheme: "myapp" }),
        });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  // HANDLE REGISTER AND FORGOT PASSWORD
  const handleForgotPasswordPress = () => {
    console.log("Forgot Password Pressed");
    // Navigate to Forgot Password screen or handle logic
  };

  const handleRegisterPress = () => {
    console.log("Register Pressed");
    // Navigate to Register screen or handle logic
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />

      <Text style={[styles.moto, globalStyles.text]}>
        For a cleaner living space
      </Text>

      <TextInput
        style={[styles.input, globalStyles.input]}
        placeholder="Email"
        value={emailAddress}
        onChangeText={(email) => setEmailAddress(email)}
        autoCapitalize="none"
        placeholderTextColor="black"
      />
      <TextInput
        style={[styles.input, globalStyles.input]}
        placeholder="Password"
        value={password}
        onChangeText={(password) => setPassword(password)}
        autoCapitalize="none"
        placeholderTextColor="black"
        secureTextEntry={true} // To hide the password input
      />

      <View style={styles.horizontalLineContainer}>
        <View style={styles.line} />
        <Text style={[styles.orText, globalStyles.text]}>or</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socialLoginContainer}>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => handleSocialLogin("Facebook")}
        >
          <AntDesign name="facebook-square" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => handleSocialLogin("Apple")}
        >
          <AntDesign name="apple1" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => handleSocialLogin("Google")}
        >
          <AntDesign name="google" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
        <Text style={[styles.loginButtonText, globalStyles.text]}>Login</Text>
      </TouchableOpacity>

      <View style={styles.linkContainer}>
        <TouchableOpacity onPress={handleForgotPasswordPress}>
          <Text style={[styles.linkText, globalStyles.text]}>
            Forgot password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegisterPress}>
          <Link
            href="/(auth)/signup"
            style={[styles.linkText, globalStyles.text]}
          >
            Register
          </Link>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,

    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 150,
    width: 270,
    resizeMode: "contain",
  },
  moto: {
    marginBottom: 70,
    fontStyle: "italic",
  },
  input: {
    width: "75%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20, // Space between inputs
    borderRadius: 15, // Rounded corners for input fields
    backgroundColor: "#fff",
  },
  horizontalLineContainer: {
    flexDirection: "row", // Align items horizontally
    alignItems: "center",
    width: "80%",
    marginVertical: 20, // Space above and below the line
  },
  line: {
    flex: 1, // Stretch the line to fill available space
    height: 1, // Height of the line
    backgroundColor: "#ccc",
  },
  orText: {
    marginHorizontal: 10, // Space between the "OR" and the lines
    fontSize: 14,
    color: "#333",
  },
  socialLoginContainer: {
    flexDirection: "row",
    justifyContent: "space-around", // Space between the buttons
    width: "80%",
    marginTop: 20,
  },
  socialButton: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    width: 50, // Button width (adjust for your needs)
    height: 50, // Button height (adjust for your needs)
    justifyContent: "center",
    alignItems: "center",
  },
  socialLogo: {
    width: 30,
    height: 30, // Logo size
  },
  loginButton: {
    marginTop: 50, // Adds space between social buttons and login button
    backgroundColor: Colors.primaryColor,
    paddingVertical: 15,
    borderRadius: 15,
    width: "75%",
  },
  loginButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkContainer: {
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20, // Space between login button and the links
    width: "80%",
  },
  linkText: {
    color: "#000",
    fontSize: 16,
    marginVertical: 7,
  },
});
