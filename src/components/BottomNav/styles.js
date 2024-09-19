import { StyleSheet, Platform } from "react-native";

const ICON_SIZE = 24;
const NAV_HEIGHT = Platform.OS === 'ios' ? 84 : 64; // Ajuste para la barra de navegación en iOS
const ACTIVE_COLOR = '#007AFF';
const INACTIVE_COLOR = '#8E8E93';

export default StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingBottom: Platform.OS === 'ios' ? 34 : 16, // Ajuste para el notch en iOS
    paddingTop: 12,
    height: NAV_HEIGHT,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E0E0E0',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5, // Para sombra en Android
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    fontSize: ICON_SIZE,
    color: INACTIVE_COLOR,
  },
  navIconActive: {
    color: ACTIVE_COLOR,
  },
  navLabel: {
    marginTop: 4,
    fontSize: 12,
    color: INACTIVE_COLOR,
  },
  navLabelActive: {
    color: ACTIVE_COLOR,
  },
});