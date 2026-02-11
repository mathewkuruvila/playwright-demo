# OzBargain Section & Link Test Plan

## Application Overview

This test plan validates that all main sections on https://www.ozbargain.com.au/ display valid data and that all links are functioning correctly. Ad content is excluded from validation. Edge cases are included to ensure robustness. Each scenario assumes a fresh browser state and can be run independently.

## Test Scenarios

### 1. Section & Link Validation

**Seed:** `tests/custom-seed.spec.ts`

#### 1.1. Main sections display valid data

**File:** `tests/sections-links/happy-path.spec.ts`

**Steps:**
  1. Navigate to the home page.
    - expect: All main sections are visible and populated with valid (non-empty, non-placeholder) data.

#### 1.2. All section links are functional

**File:** `tests/sections-links/links-working.spec.ts`

**Steps:**
  1. Click each link in all main sections and verify the destination loads successfully.
    - expect: All navigation links in each section are clickable and lead to valid pages (no 404 or error pages).

#### 1.3. Section displays empty data

**File:** `tests/sections-links/empty-section.spec.ts`

**Steps:**
  1. Simulate or locate a section with empty data.
    - expect: Section displays a user-friendly message or placeholder when data is empty; no errors occur.

#### 1.4. Section contains broken link

**File:** `tests/sections-links/broken-link.spec.ts`

**Steps:**
  1. Simulate or locate a section with a broken link and click it.
    - expect: Broken links display an error or redirect to a 404 page; error is handled gracefully.

#### 1.5. Section loads slowly

**File:** `tests/sections-links/slow-section.spec.ts`

**Steps:**
  1. Simulate slow loading for a section and observe behavior.
    - expect: Section displays loading indicator or message; no UI freeze or crash.

#### 1.6. Section contains unexpected data type

**File:** `tests/sections-links/unexpected-data-type.spec.ts`

**Steps:**
  1. Simulate or locate a section with incorrect data type (e.g., string instead of number).
    - expect: Section handles unexpected data types gracefully, displaying a fallback or error message.

#### 1.7. Section contains special characters or long text

**File:** `tests/sections-links/special-characters.spec.ts`

**Steps:**
  1. Simulate or locate a section with special characters or long text.
    - expect: Section displays special characters and long text correctly without layout issues.

#### 1.8. Section contains duplicate entries

**File:** `tests/sections-links/duplicate-entries.spec.ts`

**Steps:**
  1. Simulate or locate a section with duplicate entries.
    - expect: Section displays duplicate entries without breaking layout; duplicates are handled as per business rules.

#### 1.9. Section contains only one entry

**File:** `tests/sections-links/minimum-entry.spec.ts`

**Steps:**
  1. Simulate or locate a section with only one entry.
    - expect: Section displays single entry correctly; no layout or functional issues.

#### 1.10. Section contains invalid link format

**File:** `tests/sections-links/invalid-link-format.spec.ts`

**Steps:**
  1. Simulate or locate a section with an invalid link format and attempt to click.
    - expect: Invalid links are not clickable or display an error message; no application crash.
