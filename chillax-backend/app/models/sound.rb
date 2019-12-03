class Sound < ApplicationRecord
    has_many :composition_sounds
    has_many :compositions, through: :composition_sounds
end