# User Preferences System Documentation

## Overview

The portfolio application now includes a robust user preferences system that persists user settings using localStorage. This system provides theme management, preference storage, and a complete management interface.

## Architecture

### Core Components

#### 1. **ThemeContextDef.tsx** - Context Definition

```typescript
- Theme types: "dark" | "light" | "vintage" | "retro-pastel" | "brutalism"
- ThemeContextType interface
- ThemeContext creation
```

#### 2. **ThemeContext.tsx** - Theme Provider

```typescript
- System theme detection
- localStorage persistence
- Automatic theme application
- Custom event dispatching
```

#### 3. **useTheme.ts** - Theme Hook

```typescript
- Easy theme access from components
- Type-safe theme operations
```

#### 4. **useUserPreferences.ts** - Preferences Hook

```typescript
- Complete preference management
- localStorage operations
- Export/import functionality
- Error handling
```

#### 5. **PreferencesManager.tsx** - UI Component

```typescript
- Theme selection interface
- Export/import controls
- Reset functionality
- Toast notifications
```

## Features

### 🎨 Theme Management

- **5 Available Themes**: Dark, Light, Vintage, Retro Pastel, Brutalism
- **System Detection**: Automatically detects user's OS theme preference
- **Persistence**: Themes persist across browser sessions
- **Real-time Switching**: Instant theme application without reload

### 💾 Data Persistence

- **localStorage Storage**: Preferences stored locally in browser
- **No Server Dependency**: Works completely offline
- **Error Handling**: Graceful fallbacks for storage issues
- **JSON Format**: Human-readable preference format

### 🔧 Preference Types

```typescript
interface UserPreferences {
  theme: Theme;
  language: string;
  animations: boolean;
  notifications: boolean;
}
```

### 📦 Export/Import

- **JSON Export**: Download preferences as JSON file
- **Import Validation**: Safe import with error handling
- **Backup/Restore**: Easy preference backup and restoration

## Usage Examples

### Basic Theme Usage

```tsx
import { useTheme } from "../hooks/useTheme";

const MyComponent = () => {
  const { theme, setTheme, toggleTheme } = useTheme();

  return (
    <div className={`theme-${theme}`}>
      <button onClick={() => setTheme("dark")}>Dark Theme</button>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};
```

### Preferences Management

```tsx
import { useUserPreferences } from "../hooks/useUserPreferences";

const SettingsComponent = () => {
  const {
    preferences,
    updatePreferences,
    exportPreferences,
    importPreferences,
    resetPreferences,
  } = useUserPreferences();

  const handleExport = () => {
    const data = exportPreferences();
    // Download logic here
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={preferences.animations}
          onChange={(e) => updatePreferences({ animations: e.target.checked })}
        />
        Enable Animations
      </label>
      <button onClick={handleExport}>Export Settings</button>
      <button onClick={resetPreferences}>Reset to Defaults</button>
    </div>
  );
};
```

## Navigation Integration

The preferences system is integrated into the main navigation:

### Desktop Navigation

- Settings icon in the top navigation bar
- Dropdown panel with theme options
- Export/import controls

### Mobile Navigation

- Settings option in mobile menu
- Full preferences panel
- Touch-optimized interface

## Technical Benefits

### 🚀 Performance

- **No Network Requests**: All data stored locally
- **Instant Loading**: Preferences available immediately
- **Optimized Re-renders**: Smart state management

### 🔒 Privacy

- **Local Storage Only**: No data sent to servers
- **User Control**: Complete user control over data
- **GDPR Friendly**: No cookies, no tracking

### 🛠️ Developer Experience

- **Type Safety**: Full TypeScript support
- **Error Boundaries**: Graceful error handling
- **Hot Reload**: Fast refresh compatible
- **Testing**: Built-in test utilities

## Browser Support

- **localStorage**: All modern browsers
- **System Theme Detection**: CSS media queries support
- **Fallbacks**: Graceful degradation for older browsers

## Storage Details

### localStorage Keys

- `theme`: Current theme setting
- `userPreferences`: Complete preferences object

### Data Format

```json
{
  "theme": "dark",
  "preferences": {
    "language": "en",
    "animations": true,
    "notifications": true
  }
}
```

## Future Enhancements

### Planned Features

- [ ] Cloud sync (optional)
- [ ] More theme options
- [ ] Advanced animation controls
- [ ] Accessibility preferences
- [ ] Color customization
- [ ] Font preferences

### Extension Points

The system is designed for easy extension:

- Add new preference types in `useUserPreferences`
- Create custom theme variants in `ThemeContextDef`
- Extend the UI in `PreferencesManager`

## Testing

A test component is included for development validation:

- **PreferencesTest.tsx**: Automated testing of all features
- **localStorage validation**: Verify data persistence
- **Theme switching**: Test all theme transitions
- **Export/import**: Validate file operations

## Troubleshooting

### Common Issues

1. **Theme not persisting**: Check localStorage availability
2. **Import not working**: Validate JSON format
3. **Styles not applying**: Ensure theme classes in CSS

### Debug Commands

```javascript
// Check current theme
localStorage.getItem("theme");

// Check all preferences
JSON.parse(localStorage.getItem("userPreferences") || "{}");

// Clear all preferences
localStorage.removeItem("theme");
localStorage.removeItem("userPreferences");
```

## Conclusion

The user preferences system provides a complete, performant, and user-friendly way to manage application settings. It follows modern web development best practices while maintaining simplicity and extensibility.
