class Composition < ApplicationRecord
  belongs_to :user
  has_many :composition_sounds
  has_many :sounds, through: :composition_sounds
end
