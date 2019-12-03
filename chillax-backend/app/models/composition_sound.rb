class CompositionSound < ApplicationRecord
  belongs_to :sound
  belongs_to :composition
end
