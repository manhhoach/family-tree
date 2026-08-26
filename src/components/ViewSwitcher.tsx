'use client'

import { SegmentedControl } from '@mantine/core'

type ViewMode = 'card' | 'tree'

interface ViewSwitcherProps {
  value: ViewMode
  onChange: (value: ViewMode) => void
}

export default function ViewSwitcher({
  value,
  onChange,
}: ViewSwitcherProps) {
  return (
    <SegmentedControl
      value={value}
      onChange={(value) => onChange(value as ViewMode)}
      data={[
        { label: 'Card', value: 'card' },
        { label: 'Tree', value: 'tree' },
      ]}
    />
  )
}