import { StyleSheet } from 'react-native';

const colors = {
  primary: '#a06b5b',        // sage green — buttons, links
  secondary: '#7d9469',      // terracotta — accents
  background: '#f5ede4',     // off-white warm tone to match palette
  input: '#ede5db',          // slightly darker warm beige for input bg
  border: '#c9b49a',         // warm beige for borders
  textDark: '#4a4f2f',       // dark olive for headings
  textGrey: '#7d6e63',       // muted warm brown for subtitles/placeholders
  white: '#fff',
  dark: '#5c3a2d',           // deep brown — can use for bold text or accents
};

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    color: colors.textDark,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textGrey,
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: colors.input,
    paddingHorizontal: 16,
    marginBottom: 14,
    fontSize: 14,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: 13,
  },
  button: {
    width: '100%',
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
  },
  signupText: {
    color: colors.textGrey,
    fontSize: 13,
  },
  signupLink: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
});

export const signUpStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textGrey,
    marginBottom: 32,
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: colors.input,
    paddingHorizontal: 16,
    marginBottom: 14,
    fontSize: 14,
  },
  button: {
    width: '100%',
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    marginBottom: 20,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
  },
  loginText: {
    color: colors.textGrey,
    fontSize: 13,
  },
  loginLink: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
});
