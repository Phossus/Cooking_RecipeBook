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

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5ede4',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4a4f2f',
  },
  subtitle: {
    fontSize: 13,
    color: '#7d6e63',
    marginTop: 2,
  },
  logout: {
    fontSize: 13,
    color: '#a06b5b',
    fontWeight: '600',
  },
  heroCard: {
    backgroundColor: '#7d9469',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 28,
  },
  heroEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 13,
    color: '#e8f0e4',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#5c3a2d',
    marginBottom: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    borderColor: '#c9b49a',
    borderWidth: 1,
  },
  cardEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4a4f2f',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 11,
    color: '#7d6e63',
  },
});

export const categoriesStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5ede4',
        paddingHorizontal: 20,
        paddingTop: 60,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5ede4',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4a4f2f',
        marginBottom: 20,
    },
        backButton: {
        marginBottom: 10,
    },
    backText: {
        fontSize: 14,
        color: '#a06b5b',
        fontWeight: '600',
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 14,
        overflow: 'hidden',
        borderColor: '#c9b49a',
        borderWidth: 1,
    },
    cardImage: {
        width: 90,
        height: 90,
    },
    cardInfo: {
        flex: 1,
        padding: 12,
        justifyContent: 'center',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#4a4f2f',
        marginBottom: 4,
    },
    cardDescription: {
        fontSize: 12,
        color: '#7d6e63',
        lineHeight: 18,
    },
});

export const categoryMealsStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5ede4',
        paddingHorizontal: 20,
        paddingTop: 60,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5ede4',
    },
    backButton: {
        marginBottom: 10,
    },
    backText: {
        fontSize: 14,
        color: '#a06b5b',
        fontWeight: '600',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4a4f2f',
        marginBottom: 20,
    },
    row: {
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 14,
        overflow: 'hidden',
        borderColor: '#c9b49a',
        borderWidth: 1,
    },
    cardImage: {
        width: '100%',
        height: 120,
    },
    cardTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#4a4f2f',
        padding: 8,
    },
});

export const searchStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5ede4',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a4f2f',
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    height: 48,
    backgroundColor: '#ede5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    borderColor: '#c9b49a',
    borderWidth: 1,
    fontSize: 14,
    color: '#4a4f2f',
  },
  searchButton: {
    backgroundColor: '#7d9469',
    borderRadius: 8,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
      backButton: {
        marginBottom: 10,
    },
    backText: {
        fontSize: 14,
        color: '#a06b5b',
        fontWeight: '600',
    },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 14,
    overflow: 'hidden',
    borderColor: '#c9b49a',
    borderWidth: 1,
  },
  cardImage: {
    width: 90,
    height: 90,
  },
  cardInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4a4f2f',
    marginBottom: 4,
  },
  cardCategory: {
    fontSize: 12,
    color: '#7d6e63',
  },
  noResults: {
    textAlign: 'center',
    color: '#7d6e63',
    marginTop: 40,
    fontSize: 14,
  },
});

export const recipeDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5ede4',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5ede4',
  },
  image: {
    width: '100%',
    height: 280,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  heartButton: {
      padding: 4,
      marginLeft: 10,
  },
  heartEmoji: {
      fontSize: 28,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a4f2f',
    marginBottom: 6,
  },
  meta: {
    fontSize: 13,
    color: '#7d6e63',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#5c3a2d',
    marginBottom: 10,
    marginTop: 10,
  },
  ingredient: {
    fontSize: 14,
    color: '#4a4f2f',
    marginBottom: 4,
    lineHeight: 22,
  },
  instructions: {
    fontSize: 14,
    color: '#4a4f2f',
    lineHeight: 24,
    marginBottom: 40,
  },
});

export const favouritesStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5ede4',
        paddingHorizontal: 20,
        paddingTop: 60,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5ede4',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4a4f2f',
        marginBottom: 20,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 14,
        overflow: 'hidden',
        borderColor: '#c9b49a',
        borderWidth: 1,
        alignItems: 'center',
    },
    cardImage: {
        width: 90,
        height: 90,
    },
    cardInfo: {
        flex: 1,
        padding: 12,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#4a4f2f',
        marginBottom: 4,
    },
    cardDate: {
        fontSize: 11,
        color: '#7d6e63',
    },
    removeButton: {
        padding: 12,
    },
    removeText: {
        fontSize: 20,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
    },
    emptyEmoji: {
        fontSize: 48,
        marginBottom: 16,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#4a4f2f',
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 13,
        color: '#7d6e63',
        textAlign: 'center',
    },
});
